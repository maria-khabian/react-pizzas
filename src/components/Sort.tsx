import React from 'react';

import { useDispatch } from 'react-redux';
import { setSortType, TSort, TSortType } from '../redux/slices/filterSlices';

//типизируем массив listSelected, создаём тип:
type ItemSelected = {
  name: string; 
  sortProperty: TSort;
}
type SortProps = {
  sort: TSortType
}

//переделали стейт на объекты со свойствами
export const listSelected: ItemSelected[] = [
  { name: 'популярности ↑', sortProperty: TSort.RATING_DESC },
  { name: 'популярности ↓', sortProperty: TSort.RATING_ASC },
  { name: 'цене ↑', sortProperty: TSort.PRICE_DESC },
  { name: 'цене ↓', sortProperty: TSort.PRICE_ASC },
  { name: 'алфавиту ↑', sortProperty: TSort.TITLE_DESC },
  { name: 'алфавиту ↓', sortProperty: TSort.TITLE_ASC },
];

const Sort: React.FC<SortProps> = React.memo(
  ({sort}) => {
    // useWhyDidYouUpdate('Sort', { sort })
     const [open, setOpen] = React.useState(false);
     // const [selected, setSelected] = React.useState(0);
   
     
     const sortRef = React.useRef<HTMLDivElement>(null);
     //о чем говорить строка? Что useRef может передать по умолчанию null (ref не разрешает хранить undefined поэтому по умолчанию передаём null) или HTMLDivElement
     // типизируем useRef; нельзя передавать пустой useRef() надо указывать null - иначе useRef ругается; для каждого HTML эл-та есть свой тип в нашем случае <HTMLDivElement> (как определить? наводим на ref={sortRef} при элементе и там в всплывающем окне будет указано)
   
     const dispatch = useDispatch();
   
     const onClickListItem = (obj: ItemSelected) => {
       dispatch(setSortType(obj));
       setOpen(false);
     };
   
     React.useEffect(() => {
       
       const handleClickOutside = (event: MouseEvent) => {
         
         if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
           setOpen(false);
         };
       } 
       
       document.body.addEventListener('click', handleClickOutside);
   
       return () => {
         document.body.removeEventListener('click', handleClickOutside);
       };
     }, []);
   
     return (
       <div ref={sortRef} className="sort">
         <div className="sort__label">
           <div className="sort__label_wrapper">
             <svg
               width="10"
               height="6"
               viewBox="0 0 10 6"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <path
                 d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                 fill="#2C2C2C"
               />
             </svg>
             <b>Сортировка по:</b>
           </div>
   
           <span
             onClick={() => {
               setOpen(!open);
             }}>
             {/* Вынимаем теперь из объекта свойство name */}
             {sort.name}
           </span>
         </div>
         {/* Условный рендеринг (если open true - покажи div с разметкой, тоесть открой popup) */}
         { open && (
           <div className="sort__popup">
             <ul>
               {listSelected.map((obj, index) => (
                 <li
                   key={index}
                   onClick={() => onClickListItem(obj)}
                   // Теперь мы сравниваем sortProperty с объекта из стейта (который мы отправили в стейт функцией onClickListItem) и с объектом из listSelected.map
                   className ={(sort.sortProperty === obj.sortProperty && 'active') || ''}>
                   {/* className ={(sortType.sortProperty === obj.sortProperty ? 'active': '')}> */}
                   {obj.name}
                 </li>
               ))}
             </ul>
           </div>
         )}
       </div>
     );
   }
   )
  

export default Sort;
