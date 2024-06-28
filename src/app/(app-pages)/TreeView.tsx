import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface TreeNode {
  id: string;
  list_order: number;
  parent_id: string | null;
  slug: string;
  child_count: number;
  title: string;
  href: string;
}

interface TreeViewProps {
  nodes: TreeNode[];
}

const TreeView: React.FC<TreeViewProps> = ({ nodes }) => {
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});

  const toggleCollapse = (id: string) => {
    setCollapsed(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const hasChildren = (id: string) => {
    return nodes.some(node => node.parent_id === id);
  };

  const renderTree = (parentId: string | null) => {
    return nodes
      .filter(node => node.parent_id === parentId)
      .sort((a, b) => a.list_order - b.list_order)
      .map(node => (
        <div key={node.id} className="ml-4">
          <div className="py-1 flex items-center">
            {hasChildren(node.id) && (
              <div
                className="cursor-pointer p-1 rounded hover:bg-gray-100 transition"
                onClick={() => toggleCollapse(node.id)}
                style={{ width: '16px', display: 'inline-block' }}
              >
                <FontAwesomeIcon
                  icon={collapsed[node.id] ? faChevronRight : faChevronDown}
                  className="text-xs"
                />
              </div>
            )}
            {!hasChildren(node.id) && <div style={{ width: '16px', display: 'inline-block' }}></div>}
            <a href={node.href} className="ml-2 text-blue-600 hover:underline">
              {node.title}
            </a>
          </div>
          {!collapsed[node.id] && <div>{renderTree(node.id)}</div>}
        </div>
      ));
  };

  return <div>{renderTree(null)}</div>;
};

export default TreeView;
