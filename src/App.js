import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ProductList from './components/ProductList/ProductList';

function App() {
    const { tg, onToggleButton } = useTelegram();
    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route index element={<ProductList />}></Route>
                <Route path={'form'} element={<Form />}></Route>
            </Routes>
        </div>
    );
}

export default App;
