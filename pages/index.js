import Layout from "../components/layout";
import Box from "../components/Box";

function IndexPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h2 className="p-3 my-8 text-lg font-bold bg-yellow-400 md:text-2xl">
          Dune release countdown
        </h2>
        <div className="grid grid-cols-12 gap-1">
          {
            Array(20).fill(0).map((_, index) => {
              return <Box key={index}></Box>
            })
          }
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;
