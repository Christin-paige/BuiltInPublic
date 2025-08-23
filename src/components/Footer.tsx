import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='w-full flex-shrink-0 flex justify-center py-4 px-8 gap-12 bg-primary-950/70 border-t border-primary-700 text-text-300'>
      <a
        href='https://builtinpublic.features.vote/board'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Suggest a feature on BuiltInPublic'
        className='font-body text-lg transition-all duration-300 hover:text-text-400 hover:underline'
      >
        Suggest a feature
      </a>
      <Link
        href='/about'
        className='font-body text-lg transition-all duration-300 hover:text-text-400 hover:underline'
        aria-label='Learn more about BuiltInPublic'
      >
        About Us
      </Link>
    </footer>
  );
}
