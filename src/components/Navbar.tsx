import NavbarItems from './NavbarItems';

export default function Navbar() {
  return (
    <div className='flex dark:bg-gray-900  p-4 lg:bg-amber-400 lg:text-white justify-center gap-6'>
      <NavbarItems title='Trending' param='fetchTrending' />
      <NavbarItems title='Top Rated' param='fetchTopRated' />
    </div>
  );
}