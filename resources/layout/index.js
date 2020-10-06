import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import MainContent from "./components/main-content";
import LeftNav from "./components/left-nav";
import { useSelector, useDispatch } from "react-redux";
import { get } from "lodash";
import withAuthHoc from "../../hocs/with-auth.hoc";
import withBrandHoc from "../../hocs/with-brand.hoc";

export default withAuthHoc(
  withBrandHoc(function Layout({
    pageId,
    title,
    subTitle,
    utilButtons,
    children,
  }) {
    // const { user, isAuthenticated, isLoading } = useAuth0();
    // const profile = useSelector((state) =>
    //   get(state, ["userReducer", "profile"])
    // );
    // const brand = useSelector((state) => get(state, ["userReducer", "profile"]));
    // const dispatch = useDispatch();

    // console.log("isLoading", isLoading);
    // console.log("isAuth", isAuthenticated);
    // console.log("user", user);

    // // useEffect(() => {}, [isAuthenticated, isLoading]);
    // if (!isLoading && !isAuthenticated) {
    //   typeof window !== "undefined" &&
    //     (window.location = `${window.location.origin}/sign-in`);
    //   // history && history.push("/sign-in");
    // }

    return (
      <>
        <LeftNav pageId={pageId} />
        <MainContent
          title={title}
          subTitle={subTitle}
          utilButtons={utilButtons}
        >
          {children}
        </MainContent>
      </>
    );
  })
);
