import React, { Fragment } from 'react';
import { MainNav } from '../main-nav/main-nav.component';
import { TodoList } from '../todo-list/todo-list.component';

export const App: React.FC = () => {
    return (
        <Fragment>
            <MainNav />
            <TodoList />
        </Fragment>
    );
};
