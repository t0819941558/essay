// 给定树状结构及被选中的叶子节点数组，计算出每一个节点的选中状态
//   status 定义为
// 0: 所有子节点均未被选中
// 1: 同时存在被选中的子节点和未被选中的子节点
// 2: 所有子节点均被选中

// 选中节点数组示例（默认selectedNode中只有叶子节点）: selectedNode = ['1-1-1', '1-1-2', '1-2-1', '1-3-1-1', '1-3-1-2', '1-3-1-3', '1-3-1-4']
// 树状结构示例: 
const selectedNode = ['1-1-1', '1-1-2', '1-2-1', '1-3-1-1', '1-3-1-2', '1-3-1-3', '1-3-1-4'];
const tree = {
  name: '1',
  status: 0,
  children: [
    {
      name: '1-1',
      status: 0,
      children: [
        {
          name: '1-1-1',
          status: 0
        },
        {
          name: '1-1-2',
          status: 0
        }
      ]
    },
    {
      name: '1-2',
      status: 0,
      children: [
        {
          name: '1-2-1',
          status: 0
        },
        {
          name: '1-2-2',
          status: 0
        },
        {
          name: '1-2-3',
          status: 0
        }
      ]
    },
    {
      name: '1-3',
      status: 0,
      children: [
        {
          name: '1-3-1',
          status: 0,
          children: [{
            name: '1-3-1-1',
            status: 0
          }, {
            name: '1-3-1-2',
            status: 0
          }, {
            name: '1-3-1-3',
            status: 0
          }, {
            name: '1-3-1-4',
            status: 0
          },]
        },
        {
          name: '1-3-2',
          status: 0
        },
        {
          name: '1-3-3',
          status: 0
        }
      ]
    }
  ]
}

export const initTree = (tree, selectedNode) => {
  const deepTraverse = (node) => {
    if (node.children) {
      let selectedCount = 0;
      let unselectedCount = 0;

      for (const child of node.children) {
        // 深度遍历,先执行内部
        deepTraverse(child);

        if (selectedNode.includes(child.name)) {
          selectedCount++;
        } else {
          unselectedCount++;
        }
      }
      // 有的子节点没有选中
      if (selectedCount > 0 && unselectedCount > 0) {
        node.status = 1;
      }
      // 所有的子节点都选中 
      else if (selectedCount === node.children.length) {
        node.status = 2;
      }
    } else {
      // 当没有子节点,节点为2
      node.status = 2;
    }
  };

  deepTraverse(tree);
  return tree;
};

console.log(initTree(tree, selectedNode))