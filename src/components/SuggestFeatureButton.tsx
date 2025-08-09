'use client';

import Script from 'next/script';
import { useId } from 'react';
import { Button } from './ui/button';

export const SuggestFeatureButton = () => {
  const sessionKey = useId();

  return (
    <>
      <Button
        variant='outline'
        onClick={() => {
          // @ts-ignore
          window.openFeatureRequestPopup();
        }}
        className='cursor-pointer'
      >
        Suggest a feature
      </Button>
      <Script
        key={sessionKey}
        src={`https://features.vote/widget/widget.js?sessionKey=${sessionKey}`}
        // @ts-ignore
        color_mode='dark'
        user_id='<Optional>'
        user_email='<Optional>'
        user_name='<Optional>'
        img_url='<Optional>'
        user_spend={0}
        slug='builtinpublic'
      />
    </>
  );
};
