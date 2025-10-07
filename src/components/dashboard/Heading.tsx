import React from 'react';

const Heading = () => {
  return (
    <>
      <section className="flex justify-between w-full h-auto bg-white shadow-xs py-5 px-10 rounded-md">
        <div className="flex gap-3">
          <span className="border-2 px-3 py-2 border-primer rounded-md">
            Total:{' '}
          </span>
          <span className="border-2 px-3 py-2 border-primer rounded-md">
            Prodi:{' '}
          </span>
          <span className="border-2 px-3 py-2 border-primer rounded-md">
            Rata-rata IPK:{' '}
          </span>
        </div>
        <div className="flex gap-3">
          <button className="border-2 px-3 py-2 border-primer rounded-md hover:bg-primer hover:text-white transition ease-in-out duration-300">
            Export JSON
          </button>
          <button className="border-2 px-3 py-2 border-primer rounded-md hover:bg-primer hover:text-white transition ease-in-out duration-300">
            Export CSV
          </button>
          <button className="border-2 px-3 py-2 border-primer rounded-md hover:bg-primer hover:text-white transition ease-in-out duration-300">
            Import
          </button>
          <button className="border-2 px-3 py-2 border-primer rounded-md hover:bg-primer hover:text-white transition ease-in-out duration-300">
            Print
          </button>
        </div>
      </section>
    </>
  );
};

export default Heading;
