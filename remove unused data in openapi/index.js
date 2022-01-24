const YAML = require('yaml');
const fs = require('fs');

const data = YAML.parse(fs.readFileSync('./input.yaml').toString());

const used = new Set([
    '#/components/schemas/envelope',
    ]
);


function goAndSearch(path, originalObject) {
    let curr = originalObject;
    path.slice(2).split('/').forEach(p => {
        curr = curr[p];
    });

    function searchUsedRefs(object, path) {
        if (typeof object === 'object') {
            Object.entries(object).forEach(([key, value]) => {
                if (key === '$ref' && typeof value === 'string' && value.startsWith('#/')) {
                    if (!used.has(value)) {
                        used.add(value);
                        goAndSearch(value, originalObject);
                    }
                } else if (typeof value === 'object') {
                    searchUsedRefs(value, path + '/' + key);
                }
            })
        }
    }

    searchUsedRefs(curr, path);
}

Array.from(used).forEach((path) => goAndSearch(path, data));

function deleteUnusedRefs(object, path = '#') {
    Object.entries(object).forEach(([key, value]) => {
        const thisPath = path + '/' + key;
        if (Array.from(used).some(u => u.startsWith(thisPath)) && !used.has(thisPath) && typeof value === 'object') {
            deleteUnusedRefs(value, thisPath);
        } else if (!used.has(thisPath)) {
            delete object[key];
        }
    })
}
deleteUnusedRefs(data)

fs.writeFileSync('./output.yaml', YAML.stringify(data));
