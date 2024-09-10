import NavbarItems from './NavbarItems';

export default function Navbar() {
  return (
    <div className='flex dark:bg-slate-800  p-4 lg:bg-amber-500 justify-center gap-6'>
      <NavbarItems title='Trending' param='trending' />
      <NavbarItems title='Movies' param='movie' />
      <NavbarItems title='TV Shows' param='tv' />
    </div>
  );
}