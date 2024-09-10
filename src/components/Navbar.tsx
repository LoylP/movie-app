import NavbarItems from './NavbarItems';

export default function Navbar() {
  return (
    <div className='flex dark:bg-slate-950  p-4 lg:bg-amber-400 justify-center gap-6'>
      <NavbarItems title='Trending' param='fetchTrending' />
      <NavbarItems title='Popular' param='fetchPopular' />
    </div>
  );
}