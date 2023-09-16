import Link from 'next/link';
const NavBar = () => {
  return (
    <>
      <div className="bg-blue-600 text-white flex justify-between items-center">
        <h1 className="text-3xl font-extrabold py-4 px-10 w-[50%]">
          OrganConnect
        </h1>
        <nav className="mx-5 w-[20%] flex justify-between font-semibold ">
          <Link href="/profile" className="underline">
            Home
          </Link>
          <Link href="/hospital" className="">
            Find Hospitals
          </Link>
          <Link href="waiting" className="">
            Waiting List
          </Link>
        </nav>
      </div>
    </>
  );
};
export default NavBar;
