const buildTree = (data, parentId = "") => {
    const result = [];

    data.forEach(item => {
        if (item.parentId === parentId) {
            const children = buildTree(data, item._id);
            if (children.length) {
                item.children = children;
            }
            result.push(item);
        }
    });

    return result;
}

module.exports = {buildTree}