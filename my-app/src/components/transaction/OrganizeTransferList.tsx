import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {ThemeProvider} from "@material-tailwind/react";
import children = ThemeProvider.propTypes.children;

type Item = {
    name: string,
    account: string
}

type Category = {
    name: string,
    items: Array<Item> | null
}

type TransferList = {
    name: string,
    categories: Array<Category>
}

interface Props {
    transferList: { name: string; categories: { name: string; items: { name: string; account: string; }[]; }[]; },
    // x: React.Dispatch<React.SetStateAction<{ name: string; categories: { name: string; items: { name: string; account: number; }[]; }[]; }>>
}

const OrganizeTransferList: FC<PropsWithChildren<Props>> = ({transferList, children}) => {
    const [dragItem, setDragItem] = useState<Item>();
    const [dragCategory, setDragCategory] = useState<any>();
    const [displayList, setDisplayList] = useState(transferList);

    // useEffect(() => {
    //     setDisplayList(transferList)
    //     console.log("running")
    // }, [JSON.stringify(transferList)]);

    const deleteCategory = (category: Category) => {
        const targetCategories = transferList.categories.filter((item) => item.name !== category.name);
        setDisplayList((prevState) =>
            (
                {
                    ...prevState,
                    categories: targetCategories
                }
            )
        )
    }

    const deleteItem = (transferDestination: Item) => {

        transferList.categories.map((category) => {
                category.items.filter((item) =>
                    item.account !== transferDestination.account)
            }
        );
        setDisplayList(transferList)
    };

    const handleDragStart = (index: number) => {
        setDragCategory(index);
    };

    const handleDragEnter = (e: any, index: number) => {
        e.target.style.backgroundColor = "LightGray";
        const newList = transferList;
        const newCategories = transferList.categories;
        const item = newCategories[dragCategory];
        newCategories.splice(dragCategory, 1);
        newCategories.splice(index, 0, item);
        setDragCategory(index);
        newList.categories = newCategories;
        setDisplayList(newList);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        const element = e.target as HTMLLIElement;
        element.style.backgroundColor = "white";
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const element = e.target as HTMLLIElement;
        element.style.backgroundColor = "white";
    };

    // useEffect(() => {
    //     return () => {
    //         setDisplayList(list)
    //         console.log("Running")
    //     };
    // }, [JSON.stringify(list)]);

    return (
        <div className="flex flex-col p-3 rounded-r-lg shadow-lg max-w-sm w-full mx-auto justify-center">
            {displayList.categories.map((category, index) => (
                <React.Fragment>
                    <div className={"flex justify-between pl-2 pr-2 py-2 border-gray-400 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-800"}
                         key={index}
                         draggable
                         onDragStart={() => handleDragStart(index)}
                         onDragEnter={(e) => handleDragEnter(e, index)}
                         onDragLeave={(e) => handleDragLeave(e)}
                         onDrop={(e) => handleDrop(e)}
                         onDragOver={(e) => e.preventDefault()}
                    >
                        <b>{`Category: ${category.name}`}</b>
                        <button className="" onClick={() => deleteCategory(category)}>
                            <img className="h-6"
                                 src={"https://img.icons8.com/windows/512/trash.png"}></img>
                        </button>
                    </div>

                    <ul className="dnd">
                        {category.items?.map((item, index) => (
                            (item.name !== null) &&
                            <li
                                className={"flex flex-row p-6 pr-2 border-gray-400"}
                                // key={index}
                                // draggable
                                // onDragStart={() => handleDragStart(index)}
                                // onDragEnter={(e) => handleDragEnter(e, index)}
                                // onDragLeave={(e) => handleDragLeave(e)}
                                // onDrop={(e) => handleDrop(e)}
                                // onDragOver={(e) => e.preventDefault()}
                            >

                                <div className="flex justify-between w-full mr-6">
                                        <span>
                                            {`${item.name}`}
                                        </span>
                                    <span>
                                            {`${item.account}`}
                                        </span>
                                </div>
                                <div className={""}>
                                    <button onClick={() => deleteItem(item)}>
                                        <img className="h-6"
                                             src={"https://img.icons8.com/windows/512/trash.png"}></img>
                                    </button>
                                </div>
                            </li>

                        ))}
                    </ul>
                </React.Fragment>
            ))}
        </div>
    );
}

export default OrganizeTransferList;