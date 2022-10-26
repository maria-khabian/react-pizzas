import React from 'react';
//import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
  categoryId: number;
  onClickCategoryId: (id: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(
    ({ categoryId, onClickCategoryId }) => {
    //useWhyDidYouUpdate('Categories', {categoryId, onClickCategoryId})
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  
    return (
      <div className="categories">
        <ul>
          {categories.map((value, index) => (
            <li
              key={index}
              onClick={() => onClickCategoryId(index)}
              className={categoryId === index ? 'active' : ''}>
              {value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
)


export default Categories;
