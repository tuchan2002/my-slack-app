const generateUsersFromReactions = (reactions) => {
    const userReactionsMap = new Map();

    reactions.forEach((reaction) => {
        const userId = reaction.user.uid;

        if (!userReactionsMap.has(userId)) {
            userReactionsMap.set(userId, {
                user: reaction.user,
                reactions: []
            });
        }

        userReactionsMap.get(userId).reactions.push(reaction);
    });

    const users = Array.from(userReactionsMap.values());

    return users;
};

export default generateUsersFromReactions;
