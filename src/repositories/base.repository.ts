import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { AnySupabaseClient } from "../../utils/supabase/server";

export interface GetRepositoryOptions {
  filters?: Record<string, any>;
  search?: string;
  searchColumn?: string;
  orderBy?: string;
  ascending?: boolean;
  page?: number;
  limit?: number;
  count?: boolean;
}

export abstract class BaseRepository<
  TDto,
  TEntity,
  TClient extends AnySupabaseClient = AnySupabaseClient,
> {
  protected supabase: TClient;

  constructor(supabase: TClient) {
    this.supabase = supabase;
  }

  abstract getBaseQuery(count: boolean): PostgrestFilterBuilder<any, any, any>;

  abstract transformDTO(row: TDto): TEntity;

  applyPagination<T extends PostgrestFilterBuilder<any, any, any>>(
    query: T,
    page: number = 1,
    limit: number = 10,
  ): T {
    const offset = (page - 1) * limit;
    return query.range(offset, offset + limit - 1) as T;
  }

  applyFilters<T extends PostgrestFilterBuilder<any, any, any>>(
    query: T,
    filters: Record<string, any>,
  ): T {
    let enhancedQuery = query;

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === "string" && value.includes("%")) {
          // Handle LIKE queries
          enhancedQuery = enhancedQuery.like(key, value) as T;
        } else if (Array.isArray(value)) {
          // Handle IN queries
          enhancedQuery = enhancedQuery.in(key, value) as T;
        } else if (value.startsWith("!")) {
          const cleanedValue = value.slice(1);
          enhancedQuery = enhancedQuery.neq(key, cleanedValue);
        } else {
          // Handle equality
          enhancedQuery = enhancedQuery.eq(key, value) as T;
        }
      }
    });

    return enhancedQuery;
  }

  applyOrdering<T extends PostgrestFilterBuilder<any, any, any>>(
    query: T,
    orderBy: string,
    ascending: boolean = true,
  ): T {
    return query.order(orderBy, { ascending }) as T;
  }

  applySearch<T extends PostgrestFilterBuilder<any, any, any>>(
    query: T,
    searchTerm: string,
    column: string,
  ): T {
    if (!searchTerm.trim()) return query;

    // Create a text search
    let foreignTable, col;
    const columnArr = column.split(".");
    if (columnArr.length > 1) {
      foreignTable = columnArr[0];
      col = columnArr[1];
    } else {
      col = columnArr[0];
    }

    const searchQuery = `${col}.ilike.%${searchTerm}%`;
    return query.or(searchQuery, { foreignTable }) as T;
  }

  // Common repository methods that use the base query
  async findAll(options: GetRepositoryOptions = {}) {
    let query = this.getBaseQuery(Boolean(options.count));

    if (options.filters) {
      query = this.applyFilters(query, options.filters);
    }

    if (options.search && options.searchColumn) {
      query = this.applySearch(query, options.search, options.searchColumn);
    }

    if (options.orderBy) {
      query = this.applyOrdering(query, options.orderBy, options.ascending);
    }

    if (options.page || options.limit) {
      query = this.applyPagination(query, options.page, options.limit);
    }

    return query;
  }
}
