import { useState, useCallback, FormEvent } from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from 'reactstrap';
import React from 'react';
import { ITodoItem } from 'models/todo-item.model';

type TodoModalProps = {
    onSubmit: (todo: ITodoItem) => void;
    onCancel: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = props => {
    const [name, setName] = useState('');

    const onSubmit = useCallback(
        (event: FormEvent) => {
            event.preventDefault();
            props.onSubmit({ name });
        },
        [name, props.onSubmit]
    );

    const onCancel = useCallback(() => props.onCancel(), [props.onCancel]);

    return (
        <Modal isOpen autoFocus={false} toggle={onCancel}>
            <ModalHeader>Add Todo</ModalHeader>
            <Form onSubmit={onSubmit}>
                <ModalBody>
                    <FormGroup>
                        <Label for="todo">Todo</Label>
                        <Input id="todo" name="name" type="text" value={name} placeholder="Enter your todo" autoFocus onChange={e => setName(e.target.value)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onSubmit}>
                        OK
                    </Button>
                    <Button color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
};
