import { SuggestFeatureButton } from './SuggestFeatureButton';

export default function Footer() {
  return (
    <div className='hidden md:block w-full'>
      <SuggestFeatureButton />
      <h1>About</h1>
      <h1>Questions?</h1>
    </div>
  );
}
