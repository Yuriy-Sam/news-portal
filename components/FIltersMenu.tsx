import React, { FormEvent, useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { CategoryIcon, IconProps, SearchIcon, SortIcon } from "./SVGIcons";
import { CategoryType } from "@/types";
import { getCategories, useAppDispatch, useStateSelector } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";

interface CustomSelect {
  contentArr: Array<any>;
  handleContent: (title: string) => void;
  Icon?: React.ComponentType<IconProps>;
  iconStyles?: string;
  defaultValue?: string;
}
const CustomSelect = ({
  contentArr,
  handleContent,
  Icon,
  iconStyles,
  defaultValue,
}: CustomSelect) => {
  const [selected, setSelected] = useState<string>(defaultValue || "");
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    if (!defaultValue) {
      setSelected(contentArr[0].title);
    } else {
      setSelected(defaultValue);
      handleContent(contentArr.find((el) => el.title === defaultValue).value);
    }
  }, [defaultValue]);
  const handleClickItem = (title: string, value: string) => {
    setSelected(title);
    handleContent(value);
    setShow(false);
  };
  const renderContent = <T extends { title: string; value: string }>(
    arr: Array<T>
  ) => {
    return arr.map((el, i) => {
      return (
        <CustomButton
          key={i}
          handleClick={() => handleClickItem(el.title, el.value)}
          text={el.title}
          containerStyles="w-full p-2"
        />
      );
    });
  };
  return (
    <div className="relative w-full  ">
      <CustomButton
        text={selected}
        containerStyles="hover:text-primary  min-w-full text-primary-600 border-primary-200 border-solid rounded-full text-xs xl:text-base border-2 py-2 px-2 md:py-2 md:px-3"
        Icon={Icon}
        handleClick={() => setShow((prev) => !prev)}
        iconStyles={iconStyles}
      />
      <ul
        className={` after:z-10 min-w-full after:w-4 after:h-4 after:absolute after:-top-2  after:left-1/2  after:-translate-x-1/2  after:rotate-45 after:bg-primary-200 top-[120%]  shadow-2xl border-2 border-primary-200 left-1/2 -translate-x-1/2 p-2 rounded-lg z-10 absolute bg-white ${
          show ? "visible" : "invisible"
        }`}
      >
        {renderContent(contentArr)}
      </ul>
    </div>
  );
};

const sortOptionsArr = [
  { value: "newest", title: "Newest First" },
  { value: "oldest", title: "Oldest First" },
  { value: "popular", title: "Most Popular" },
  { value: "titleaz", title: "Title (A-Z)" },
  { value: "titleza", title: "Title (Z-A)" },
];

interface FiltersMenuProps {
  clearStorage: () => void;
}
const FiltersMenu = ({ clearStorage }: FiltersMenuProps) => {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const paramsCategories = params.get("categories") || "";
  const paramsSearch = params.get("searchtext") || "";
  const paramsSort = params.get("sort") || "";

  const categoriesArr = useStateSelector(
    (state) => state.category.categoryItems
  );
  const [categoryParam, setCategoryParam] = useState("");
  const [sortParam, setSortParam] = useState("");
  const [searchParam, setSearchParam] = useState(paramsSearch || "");
  const categoryStatus = useStateSelector((state) => state.category.status);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // clearStorage();
    router.push(
      `/posts?${categoryParam && `categories=${categoryParam}&`}${
        sortParam && `sort=${sortParam}&`
      }${searchParam && `searchtext=${searchParam}`}`
    );
  };
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    setSearchParam(paramsSearch);
  }, [paramsSearch]);
  // useEffect(() => {
  //   if (categoriesArr) {
  //     setCategoryParam(
  //       categoriesArr?.find((el) => el.value === paramsCategories)?.title!
  //     );
  //   }
  // }, [categoriesArr]);

  return (
    <section className=" mb-5">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className=" flex items-center w-full justify-between h-full flex-col  xl:flex-row  gap-2 md:gap-3  "
      >
        <div className=" flex items-center w-full justify-start  border-primary-200  rounded-full border-2 py-2 px-3 ">
          <SearchIcon
            iconStyles={"w-[25px] h-[25px] lg:py-0 lg:text-primary-600 mr-2"}
            color="text-primary-400"
          />
          <input
            className="mr-0  h-auto focus:outline-0 p-0   w-full text-base font-semibold text-primary-600   lg:mr-1 lg:py-0 lg:px-1"
            type="text"
            name="searchParam"
            placeholder="Search article you want..."
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
          {/* <CustomButton
            containerStyles="px-2 lg:py-0 hover:text-primary lg:text-primary-400"
            Icon={SearchIcon}
          /> */}
        </div>
        <div className=" flex items-center justify-between h-full w-full xl:w-auto  gap-1 md:gap-3  ">
          {/* <div className=" relative">
            <CustomButton
              text="Politic"
              containerStyles="hover:text-primary text-primary-600 border-primary-200 border-solid rounded-full border-2 py-2 px-5"
              Icon={CategoryIcon}
              iconStyles={"w-[20px] h-[20px] mr-2"}
            />
            <ul className=" after:z-10  after:w-4 after:h-4 after:absolute after:-top-2  after:left-1/2  after:-translate-x-1/2  after:rotate-45 after:bg-primary-200 top-[53px]  shadow-2xl border-2 border-primary-200 left-1/2 -translate-x-1/2 p-2 rounded-lg z-10 absolute bg-white ">
              <li>All</li>
              <li>Politic</li>
              <li>Health</li>
              <li>Sport</li>
              <li>Programing</li>
            </ul>
          </div> */}
          <div className=" flex items-center justify-center xl:justify-between gap-1 md:gap-3 ">
            {categoryStatus === "success" && (
              <CustomSelect
                contentArr={[
                  { title: "All Categories", value: "" },
                  ...categoriesArr!,
                ]}
                defaultValue={
                  categoriesArr?.find((el) => el.value === paramsCategories)
                    ?.title
                }
                Icon={CategoryIcon}
                handleContent={(e) => setCategoryParam(e)}
                iconStyles={"md:w-[20px] md:h-[20px] w-[15px] h-[15px] mr-1"}
              />
            )}

            <CustomSelect
              contentArr={sortOptionsArr}
              defaultValue={
                sortOptionsArr?.find((el) => el.value === paramsSort)?.title
              }
              Icon={SortIcon}
              handleContent={(e) => setSortParam(e)}
              iconStyles={"md:w-[22px] md:h-[20px] w-[17px] h-[15px] mr-1"}
            />
            {/* <CustomButton
            text="Sortinggggg"
            containerStyles="hover:text-primary text-primary-600 border-primary-200 border-solid  rounded-full border-2 py-1 px-5"
            Icon={SortIcon}
            iconStyles={"w-[30px] h-[30px] mr-1"}
          /> */}
          </div>
          <CustomButton
            text="Apply"
            type="submit"
            containerStyles=" btn_secondary text-sm md:text-base bg-primary hover:bg-primary-200 opacity-100 border-primary-200 border-solid  rounded-full border-2 py-2 px-5 "
          />
        </div>

        {/* </Link> */}
      </form>
    </section>
  );
};

export default FiltersMenu;
