import Header from "./header";
import Content from "./content";

export default function MainContent({
  title,
  subTitle,
  utilButtons,
  children,
}) {
  return (
    <div className="main-content" style={{ background: "#f9fafc" }}>
      <Header title={title} subTitle={subTitle} utilButtons={utilButtons} />
      <Content>{children}</Content>
    </div>
  );
}
