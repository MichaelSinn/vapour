import React from 'react';

import 'bulma/css/bulma.min.css';
import { Card, Columns } from 'react-bulma-components';

export default function WishList({list}) {
    if (list){
        return (
            <Columns gap={1}>
                <Columns.Column size = {2}>
                    <Card>
                        <Card.Header>
                            Wishlist
                        </Card.Header>
                        <Card.Content>
                            {list.map((game) => {
                                return <li>{game}</li>
                            })}
                        </Card.Content>
                    </Card>
                </Columns.Column>
            </Columns>
        )
    }
    return null;
}