import clsx from "clsx";

interface CategoryBoxProps {
  name: string;
  css?: string | undefined;
  dynamicCss?: string;
  categoryHandler: (category:string) => void;
  selectedCategory?: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ name, css, categoryHandler, selectedCategory,dynamicCss}) => {
  let firstCategoryCss = clsx(css, {
    "border-blue-500 text-3xl text-blue-500": selectedCategory === name,
    "text-gray-700": selectedCategory !== name,
  })
  let secondCategoryCss = clsx(css, {
    "border-blue-500 text-2xl text-blue-500": selectedCategory === name,
    "text-gray-700": selectedCategory !== name,
  })


  return (
    <div className={clsx(dynamicCss == "first" ? firstCategoryCss : dynamicCss == "second" ? secondCategoryCss : css)} onClick={()=>categoryHandler(name)}>
      {name}
    </div>
  );
};
export default CategoryBox