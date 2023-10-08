import React, { useEffect, useState } from 'react';

const Test = () => {
    const [leafChildParentIds, setLeafChildParentIds] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
//   useEffect(() => {
//     // Replace this with your JSON data
    

//     const leafChildParentIds = findParentSubmenuIds(data);
//     setLeafChildParentIds(leafChildParentIds);
//   }, []);
  const data = [
       
    {
        _id: "6517ed091843b8d08b27ea45",
        title: "Question Papers",
        url: "#",
        submenu:[
            {
                _id: "65181e759159a443db95aa61",
                title: "Kurukshetra University",
                universitycode: "KUK",
                state: "651805769159a443db95aa00",
                city: "651808359159a443db95aa18",
                submenu:[
                    {
                        _id: "65181e759159a443db95aa62",
                        title: "Kurukshetra University",
                        universitycode: "KUK",
                        state: "651805769159a443db95aa00",
                        city: "651808359159a443db95aa18",
                        submenu:[
                            {
                                _id: "65181e759159a443db95aa663",
                                title: "Kurukshetra University",
                                universitycode: "KUK",
                                state: "651805769159a443db95aa00",
                                city: "651808359159a443db95aa18",
                            },
                            {
                                _id: "65181e759159a443db95aa6e",
                                title: "Kurukshetra University",
                                universitycode: "KUK",
                                state: "651805769159a443db95aa00",
                                city: "651808359159a443db95aa18",
                            }
                        ]
                    },
                    {
                        _id: "65181e759159a443db95aa6e",
                        title: "Kurukshetra University",
                        universitycode: "KUK",
                        state: "651805769159a443db95aa00",
                        city: "651808359159a443db95aa18",
                    }
                ]
            },
            {
                _id: "65181e759159a443db95aa6e",
                title: "Kurukshetra University",
                submenu:[
                    {
                        _id: "65181e759159a443db95",
                        title: "Kurukshetra University",
                        universitycode: "KUK",
                        state: "651805769159a443db95aa00",
                        city: "651808359159a443db95aa18",
                        submenu:[
                            {
                                _id: "65181e759159a443db",
                                title: "Kurukshetra University",
                                universitycode: "KUK",
                                state: "651805769159a443db95aa00",
                                city: "651808359159a443db95aa18",
                                submenu:[
                                    {
                                        _id: "65181e759159a",
                                        title: "Kurukshetra University",
                                        universitycode: "KUK",
                                        state: "651805769159a443db95aa00",
                                        city: "651808359159a443db95aa18",
                                    },
                                    {
                                        _id: "65181e759159a443db95aa6e",
                                        title: "Kurukshetra University",
                                        universitycode: "KUK",
                                        state: "651805769159a443db95aa00",
                                        city: "651808359159a443db95aa18",
                                    }
                                ]
                            },
                            {
                                _id: "65181e759159a443db95aa6e",
                                title: "Kurukshetra University",
                                universitycode: "KUK",
                                state: "651805769159a443db95aa00",
                                city: "651808359159a443db95aa18",
                            }
                        ]
                    },
                ],
                universitycode: "KUK",
                state: "651805769159a443db95aa00",
                city: "651808359159a443db95aa18",
            }
        ],

        createdby: "64fdc84e2bc307e782b9a953",
        __v: 0
    },
]
  function findParentSubmenuIds(data, parentIds = [], targetChildId) {
    let submenuIds = [];

    for (const item of data) {
      const submenuId = item._id;
      const submenus = item.submenu;

      if (submenuId === targetChildId) {
        // Child ID is found, store the parent IDs
        submenuIds = parentIds.concat(submenuId);
        break; // Stop searching
      }

      if (submenus && submenus.length > 0) {
        parentIds.push(submenuId);
        submenuIds = findParentSubmenuIds(submenus, parentIds, targetChildId);
        parentIds.pop();
      }
    }

    return submenuIds;
  }

  const handleChildClick = (childId) => {
    const parentIds = findParentSubmenuIds(data, [], '65181e759159a');
    setLeafChildParentIds(parentIds);
    setSelectedChildId('65181e759159a');
  };
  return (
    <div>
      <h2>Leaf Child Parent IDs:</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <button onClick={() => handleChildClick(item._id)}>
              {item.title}
            </button>
          </li>
        ))}
      </ul>

      {selectedChildId && (
        <div>
          <h3>Parent IDs of Selected Child:</h3>
          <ul>
            {leafChildParentIds.map((id, index) => (
              <li key={index}>{id}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Test;