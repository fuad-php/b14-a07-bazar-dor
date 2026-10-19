
const CategoryLoading = () => {
  return (
    <main className="page-container animate-pulse py-8">
      {/* Category header skeleton */}
      <section className="mb-8 flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8">
        <div className="size-16 shrink-0 rounded-xl bg-base-300" />

        <div className="flex-1 space-y-3">
          <div className="h-4 w-28 rounded bg-base-300" />
          <div className="h-7 w-48 max-w-full rounded bg-base-300" />
          <div className="h-4 w-56 max-w-full rounded bg-base-300" />
        </div>
      </section>

      {/* Sort control skeleton */}
      <section className="mb-8 flex justify-end rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="h-10 w-52 max-w-full rounded-lg bg-base-300" />
      </section>

      {/* Product cards skeleton */}
      <section>
        <div className="mb-5 h-7 w-40 rounded bg-base-300" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-base-300 bg-base-100 p-4"
            >
              <div className="mb-4 h-40 rounded-xl bg-base-300" />

              <div className="mb-3 h-5 w-3/4 rounded bg-base-300" />
              <div className="mb-4 h-4 w-1/2 rounded bg-base-300" />

              <div className="h-10 rounded-lg bg-base-300" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CategoryLoading;
