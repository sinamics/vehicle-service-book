import Seo from "@/components/Seo";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Seo title="Layout" description="Description of Layout" />
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
        <h1>Car service book</h1>
      </div>
    </Layout>
  );
}
