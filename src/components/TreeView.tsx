import { useState, useEffect } from 'react';
interface Service {
    id: number;
    head: string | null;
    name: string;
    node: 0 | 1;
    price: number;
    sorthead: number;
}

function TreeView() {
    const [treeData, setTreeData] = useState<Service[]>([]);
    useEffect(() => {
        // Запрос данных через REST API
        fetch('http://localhost:3000/services')
            .then(response => response.json())
            .then((data: Service[]) => setTreeData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const renderTree = (nodes: Service[], parentId: number | null = null) => {
        return nodes
            .filter(node => node.head === parentId)
            .sort((a, b) => a.sorthead - b.sorthead)
            .map(node => (
                <div key={node.id}>
                    {node.node === 1 ?
                    <details className={"spoiler"}>
                        <summary className={"spoiler-header"}>{node.name}</summary>
                            <div style={{ marginLeft: '35px', justifyContent: 'inherit' }} className={"spoiler-content"}>
                                {renderTree(nodes, +node.id)}
                            </div>
                    </details> : <li>{node.name} {"(" +node.price+ ")"}</li>}
                </div>
            ));
    };

    return (
        <div className={'tree-main'}>
            <h1>Доступные услуги</h1>
            <div className={'tree-view'}>{renderTree(treeData)}</div>

        </div>

    );
}

export default TreeView;

