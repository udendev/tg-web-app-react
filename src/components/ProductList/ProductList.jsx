import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import { useState } from 'react';

const products = [
    { id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые' },
    { id: '2', title: 'Куртка', price: 4000, description: 'Красного цвета, прямые' },
    { id: '3', title: 'Джинсы 2', price: 3000, description: 'Зеленого цвета, прямые' },
    { id: '4', title: 'Джинсы 1', price: 1000, description: 'Оранжевого цвета, прямые' },
    { id: '5', title: 'Джинсы 4', price: 7000, description: 'Синего цвета, прямые' },
];

const calcTotalPrice = (items = []) => {
    return items.reduce((acc, item) => acc + item.price, 0);
};

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);

    const { tg, queryId } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            queryId,
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
        };

        fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }, [tg, queryId]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);

        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [tg, onSendData]);

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find((item) => item.id === product.id);

        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter((item) => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${calcTotalPrice(newItems)}`,
            });
        }
    };
    return (
        <div className={'list'}>
            {products.map((item) => (
                <ProductItem product={item} onAdd={onAdd} className={'item'} />
            ))}
        </div>
    );
};

export default ProductList;
