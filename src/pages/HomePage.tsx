import SnippetList from "../components/SnippetList";
import { useAppContext } from "../contexts/AppContext";
import Sidebar from "../layouts/Sidebar";

const HomePage = () => {
  const { category } = useAppContext();

  return (
    <>
      <Sidebar />
      <section className="flow">
        <h2 className="section-title">
          {category ? category : "Select a category"}
        </h2>
        <SnippetList />
      </section>
    </>
  );
};

export default HomePage;
