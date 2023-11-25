import React from 'react';
import generateReactionLabel from '../../utils/generateReactionLabel';

function ReactionList({reactions, handleOpenReactionsDialog}) {
    return (
        <div className='reaction-list' onClick={handleOpenReactionsDialog}>{generateReactionLabel(reactions)}</div>
    );
}

export default ReactionList;
