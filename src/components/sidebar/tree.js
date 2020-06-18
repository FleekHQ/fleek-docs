import React, { useState } from "react";
import config from "../../../config";
import TreeNode from "./treeNode";

const calculateTreeData = edges => {
  const originalData = config.sidebar.ignoreIndex
    ? edges.filter(
        ({
          node: {
            fields: { slug }
          }
        }) => slug !== "/"
      )
    : edges;
  const tree = originalData.reduce(
    (
      accu,
      {
        node: {
          fields: { slug, title }
        }
      }
    ) => {
      const parts = slug.split("/");
      let { items: prevItems } = accu;
      for (const part of parts.slice(1, -1)) {
        let tmp = prevItems.find(({ label }) => label == part);
        if (tmp) {
          if (!tmp.items) {
            tmp.items = [];
          }
        } else {
          tmp = { label: part, items: [] };
          prevItems.push(tmp);
        }
        prevItems = tmp.items;
      }
      const existingItem = prevItems.find(
        ({ label }) => label === parts[parts.length - 1]
      );
      if (existingItem) {
        existingItem.url = slug;
        existingItem.title = title;
      } else {
        prevItems.push({
          label: parts[parts.length - 1],
          url: slug,
          items: [],
          title
        });
      }
      return accu;
    },
    { items: [] }
  );
  const {
    sidebar: { forcedNavOrder = [] }
  } = config;
  const tmp = [...forcedNavOrder];
  tmp.reverse();
  return tmp.reduce((accu, slug) => {
    const parts = slug.split("/");
    let { items: prevItems } = accu;
    for (const part of parts.slice(1, -1)) {
      let tmp = prevItems.find(({ label }) => label == part);
      if (tmp) {
        if (!tmp.items) {
          tmp.items = [];
        }
      } else {
        tmp = { label: part, items: [] };
        prevItems.push(tmp);
      }
      prevItems = tmp.items;
    }
    // sort items by forcedNavOrderSubItems.
    prevItems.map(item => {
      const subItemsMapping = config.sidebar.forcedNavOrderSubItems[item.url]
      if (subItemsMapping) {
        const newItems = [];
        subItemsMapping.forEach(mapping => {
          const foundItem = item.items.find(currentItem => {
            return currentItem.url === mapping;
          })
          if (foundItem) {
            // organizing the third level of menu
            if (foundItem.items.length > 0)  {
              const thirdLevelMapping = config.sidebar.forcedNavOrderThirdLevel[foundItem.url]
              if(thirdLevelMapping) {
                const thirdLevelItems = thirdLevelMapping.map(thirdLevelUrl => {
                  return foundItem.items.find(thirdLevelItem => (thirdLevelItem.url === thirdLevelUrl))
                })
                foundItem.items = thirdLevelItems;
              }
            }

            newItems.push(foundItem);
          }
        });
        // adding the items that have no configs
        item.items.forEach(currentItem => {
          const foundItem = newItems.find(newItem => {
            return newItem.url === currentItem.url 
          });
          if(!foundItem) {
            newItems.push(currentItem);
          }
        });
        item.items = newItems;
      }
    });
    const index = prevItems.findIndex(
      ({ label }) => label === parts[parts.length - 1]
    );
    accu.items.unshift(prevItems.splice(index, 1)[0]);
    return accu;
  }, tree);
};

const setDefaultCollapse = (item, defaultCollapsed) => {
  if (
    config.sidebar.collapsedNav &&
    config.sidebar.collapsedNav.includes(item.url)
  ) {
    defaultCollapsed[item.url] = true;
  } else {
    defaultCollapsed[item.url] = false;
  }
};

const Tree = ({ edges }) => {
  const [treeData] = useState(() => {
    return calculateTreeData(edges);
  });
  const defaultCollapsed = {};
  treeData.items.forEach(item => {
    setDefaultCollapse(item, defaultCollapsed);
    if (item.items.length > 0) {
      item.items.forEach(subItem => {
        setDefaultCollapse(subItem, defaultCollapsed)
      })
    }
  });
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const toggle = url => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url]
    });
  };
  return (
    <TreeNode
      className={`${
        config.sidebar.frontLine ? "showFrontLine" : "hideFrontLine"
      } firstLevel`}
      setCollapsed={toggle}
      collapsed={collapsed}
      {...treeData}
    />
  );
};

export default Tree;
