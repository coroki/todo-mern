import { useHttpClient } from './http-client.hook';
import { useEffect, useState, useMemo } from 'react';
import { ITodoItem } from 'models/todo-item.model';

type TodoItems = ITodoItem[];

type TodoActions = {
    addItem: (item: ITodoItem) => Promise<ITodoItem>;
    removeItem: (itemId: string) => Promise<ITodoItem[]>;
};

export const useTodos = (): [TodoItems, TodoActions] => {
    const [items, setItems] = useState<ITodoItem[]>([]);

    const client = useHttpClient({
        baseURL: 'http://localhost:7000/',
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json'
    });

    const actions = useMemo(() => {
        const addItem = async (item: ITodoItem): Promise<ITodoItem> => {
            const newItem = await client.post<ITodoItem>('api/todo-items', item);
            const newItems = [...items, newItem];
            setItems(newItems);
            return newItem;
        };

        const removeItem = async (itemId: string): Promise<ITodoItem[]> => {
            await client.delete(`api/todo-items/${itemId}`);
            const newItems = items.filter(item => item._id != itemId);
            setItems(newItems);
            return newItems;
        };

        return { addItem, removeItem };
    }, [items]);

    useEffect(() => {
        const getInitialItems = async () => {
            const initialItems = await client.get<ITodoItem[]>('api/todo-items');
            setItems(initialItems);
        };
        getInitialItems();
    }, []);

    return [items, actions];
};
