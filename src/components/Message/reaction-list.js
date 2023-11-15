import React from 'react';

function ReactionList({reactions}) {
    const uniqueEmojiArray = reactions.filter(
        (item, index, self) => self.findIndex((t) => t.emoji === item.emoji) === index
    ).map((item) => item.emoji);

    const reactionLabel = `${uniqueEmojiArray.join(' ')}  ${reactions.length > 1 ? reactions.length : ''}`;

    return (
        <div className='reaction-list' onClick={() => console.log('reaction-list: click')}>{reactionLabel}</div>
    );
}

export default ReactionList;
