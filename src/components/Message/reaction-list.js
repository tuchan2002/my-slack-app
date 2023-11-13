import { Chip } from '@mui/material';
import React from 'react';

function ReactionList({reactions}) {
    const uniqueEmojiArray = reactions.filter(
        (item, index, self) => self.findIndex((t) => t.emoji === item.emoji) === index
    ).map((item) => item.emoji);

    const reactionLabel = `${uniqueEmojiArray.join(' ')} ${reactions.length > 1 ? reactions.length : ''}`;

    return (
        <Chip sx={{marginTop: 1}} label={reactionLabel} />
    );
}

export default ReactionList;
