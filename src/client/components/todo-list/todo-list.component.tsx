import { useCallback, useState } from 'react';
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './todo-list.css';
import { TodoModal } from '../todo-modal/todo-modal.component';
import { ITodoItem } from 'models/todo-item.model';
import { useTodos } from './todos.hook';

export const TodoList: React.FC = () => {
    const [items, actions] = useTodos();
    const [showModal, setShowModal] = useState(false);

    const onAddItem = useCallback(() => setShowModal(true), []);
    const onRemoveItem = useCallback((itemId: string) => actions.removeItem(itemId), [actions.addItem]);
    const onCancelAddItem = useCallback(() => setShowModal(false), []);
    const onSubmitItem = useCallback(
        (item: ITodoItem) => {
            actions.addItem(item);
            setShowModal(false);
        },
        [actions.removeItem]
    );

    return (
        <Container>
            {showModal && <TodoModal onSubmit={onSubmitItem} onCancel={onCancelAddItem} />}
            <Button color="dark" style={{ marginBottom: 20 }} onClick={onAddItem}>
                Add Item
            </Button>
            <ListGroup>
                <TransitionGroup>
                    {items.map(item => {
                        return (
                            <CSSTransition key={item._id} classNames="fade" timeout={500}>
                                <TodoListItem id={item._id} name={item.name} onRemove={onRemoveItem} />
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
};

type TodoListItemProps = {
    id: string;
    name: string;
    onRemove: (id: string) => void;
};

const TodoListItem: React.FC<TodoListItemProps> = props => {
    const onRemove = useCallback(() => props.onRemove(props.id), [props.id, props.onRemove]);
    return (
        <ListGroupItem style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ flex: 1, fontWeight: 600 }}>{props.name}</span>
            <Button className="remove-btn" color="danger" size="sm" onClick={onRemove}>
                &times;
            </Button>
        </ListGroupItem>
    );
};
