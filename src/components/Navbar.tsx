import NavbarItems from './NavbarItems';

export default function Navbar() {
  return (
    <div className='flex dark:bg-slate-800  p-4 lg:bg-amber-500 justify-center gap-6'>
      <NavbarItems title='Trending' param='fetchTrending' />
      <NavbarItems title='Popular' param='fetchPopular' />
    </div>
  );
}