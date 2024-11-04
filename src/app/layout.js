import RootLayout from "./root_layout";

export const metadata = {
  title: "Learn Arabic",
  description: "Homepage",
};

export default function ParentLayout({ children }) {
  return <RootLayout>{children}</RootLayout>;
}
