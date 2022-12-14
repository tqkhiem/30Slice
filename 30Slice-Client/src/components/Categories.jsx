import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nonAccentConverter } from '../app/services/nonAccentConverter/nonAccentConverter';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const _isMounted = useRef(false);


  const loadDataCategories = async () => {
    const res = await fetch(
      import.meta.env.REACT_APP_API_ENDPOINT + 'category/getCategories'
    );
    const data = await res.json();
    const parent = data.filter((item) => item['Parent_Id'] === null);
    const treeData = parent.map((item) => ({
      ...item,
      Children: data.filter((x) => x['Parent_Id'] === item._id),
    }));

    _isMounted.current && setCategories(treeData);
  };

  useEffect(() => {
    _isMounted.current = true;
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    loadDataCategories();
  }, []);

  return (
    <li className="mega-item has-subMenu">
      <a href='#' className="">
        Danh mục
      </a>
      <ul className="megaMenu-wrapper megaMenu-wide">
        {categories.length > 0 &&
          categories.map((category) => (
            <li key={category._id}>
              <a className="mega-title">{category?.Name}</a>
              <ul>
                {category?.Children.length > 0 &&
                  category?.Children.map((child) => (
                    <li key={child._id}>
                      <NavLink
                        to={`/category/${child.Name.replace(/ /g, '-')}`}
                        state={{ category: child._id }}
                      >
                        {child?.Name}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </li>
  );
};

export default Categories;
