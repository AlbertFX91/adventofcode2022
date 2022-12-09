import { readDayInput } from "../util/readDayInput";

type Node<T> = {
  id: string,
  parent?: Node<T>,
  children: {
    [id: string]: Node<T>
  },
  data: T,
}

type Graph<T> = {
  root: Node<T>,
}
type Directory = {
  type: 'directory'
}
type File = {
  type: 'file',
  size: number,
}
type Resource = Directory | File;
type FileSystem = Graph<Resource>;

export default async function noSpaceOnDevice() {
  const input = await readDayInput('day07');
  const fs = buildFileSystem(input);

  const directorySizes = getDirectorySizes(fs);

  const sol1 = Object.values(directorySizes).filter((size) =>  size <= 100000).reduce((a,b) => a+b, 0);

  const availableDisk = 70000000;
  const unusedSpaceRequired = 30000000;

  // TODO: Sizes could be cached in the file system
  const rootSize = directorySizes['undefined$/'];
  const keys = Object.keys(directorySizes).sort((a, b) => directorySizes[b] - directorySizes[a]);

  let sol2 = undefined;
  const unusedSize = availableDisk - rootSize;
  const unusedSizeRequired = unusedSpaceRequired - unusedSize;
  for (const key of keys) {
    const size = directorySizes[key];
    if (size > unusedSizeRequired) {
      sol2 = size;
    } else {
      break;
    }
  }
  
  return {
    sol1, // 1792222
    sol2 // 1112963
  }

}

function getDirectorySizes(fs: FileSystem): {[folderId: string]: number} {
  const root = fs.root;
  const directorySizes = {};
  _getDirectorySizes(root, directorySizes);
  return directorySizes;
}

function _getDirectorySizes(node: Node<Resource>, directorySizes: {[id: string]: number}): number {
  if (node.data.type === 'file') {
    return node.data.size;
  }
  else {
    const sizes = Object.values(node.children).map((node) => _getDirectorySizes(node, directorySizes))
    const size = sizes.reduce((acc, curr) => acc + curr, 0);
    // TODO: This cannot be used as ID. It's not collision proved. The information should be store inside the graph or in a new data structure
    directorySizes[`${node?.parent?.id}$${node.id}`] = size;
    return size;
  }
}

// TODO: Use regex, remove ifs using dicts/switch
function buildFileSystem(input: string): FileSystem {
  const graph: FileSystem = {
    root: {
      id: '/',
      data: {
        type: 'directory',
      },
      children: {},
    },
  };
  const lines = input.split('\n');
  let pointer: Node<Resource> = graph.root;
  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    // Instruction
    if (line[0] === '$') {
      const [_, inst, arg] = line.split(' ');
      // If CD
      if (inst === 'cd') {
        // Root
        if (arg === '/') {
          pointer = graph.root;
        // Go back
        } else if (arg === '..') {
          if (!pointer.parent) {
            throw new Error(`Cannot go back from ${pointer.id}`)
          }
          pointer = pointer.parent;
        // Go to child
        } else {  
          if (pointer.children[arg] === undefined) {
            throw new Error(`Cannot go into folder ${arg} from ${pointer.id}`);
          }
          pointer = pointer.children[arg];
        }
        i++;
      }
      else if (inst === 'ls') {
        // Foreach until next instruction
        i++;
        line = lines[i];
        while (i < lines.length && line[0] != '$') {
          const [pref, name] = line.split(' ');
          if (pref === 'dir') {
            pointer.children[name] = {
              id: name,
              parent: pointer,
              children: {},
              data: {
                type: 'directory',
              }
            }
          }
          else {
            pointer.children[name] = {
              id: name,
              parent: pointer,
              children: {},
              data: {
                type: 'file',
                size: parseInt(pref)
              }
            }
          }
          i++;
          line = lines[i];
      }
      }
    }
  }
  return graph;
}







