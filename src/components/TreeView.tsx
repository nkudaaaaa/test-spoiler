import { useState, useEffect } from 'react';
interface Service {
    id: number;
    head: number | null;
    name: string;
    node: 0 | 1;
    price: number;
    sorthead: number;
}
const services: Service[] = [
    {
        "id": 1,
        "head": null,
        "name": "Проф.осмотр",
        "node": 0,
        "price": 100.0,
        "sorthead": 20
    },
    {
        "id": 2,
        "head": null,
        "name": "Хирургия",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
    },
    {
        "id": 3,
        "head": 2,
        "name": "Удаление зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 10
    },
    {
        "id": 4,
        "head": 3,
        "name": "Удаление зуба",
        "node": 0,
        "price": 800.0,
        "sorthead": 10
    },
    {
        "id": 5,
        "head": 3,
        "name": "Удаление 8ого зуба",
        "node": 0,
        "price": 1000.0,
        "sorthead": 30
    },
    {
        "id": 6,
        "head": 3,
        "name": "Удаление осколка зуба",
        "node": 0,
        "price": 2000.0,
        "sorthead": 20
    },
    {
        "id": 7,
        "head": 2,
        "name": "Хирургические вмешательство",
        "node": 0,
        "price": 200.0,
        "sorthead": 10
    },
    {
        "id": 8,
        "head": 2,
        "name": "Имплантация зубов",
        "node": 1,
        "price": 0.0,
        "sorthead": 20
    },
    {
        "id": 9,
        "head": 8,
        "name": "Коронка",
        "node": 0,
        "price": 3000.0,
        "sorthead": 10
    },
    {
        "id": 10,
        "head": 8,
        "name": "Слепок челюсти",
        "node": 0,
        "price": 500.0,
        "sorthead": 20
    }
]

function TreeView() {
    const [treeData, setTreeData] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {

      setTimeout(() => {
          setTreeData(services);
          setIsLoading(false)
      }, 500)
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

            { isLoading? <h3>Loading...</h3> : <div className={'tree-view'}>{renderTree(treeData)}</div>}

        </div>

    );
}

export default TreeView;

