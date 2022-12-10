import { readDayInput } from "../util/readDayInput";

type Node<T> = {
  name: string,
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
  // Build graph
  const fs = buildFileSystem(input);
  // Get size of each directory
  const directorySizes = getDirectorySizes(fs);

  // Sort by size and sum all directories less than threshold
  const threshold = 100000;
  const sol1 = Object.values(directorySizes).filter((size) =>  size <= threshold).reduce((a,b) => a+b, 0);


  // Solution 2: smallest directory that, if deleted, would free up enought space to run the update
  const availableDisk = 70000000;
  const spaceForUpdate = 30000000;
  // Get the total size used
  const rootSize = directorySizes['/'];
  // Sort directories by size order by desc
  const keys = Object.keys(directorySizes).sort((a, b) => directorySizes[b] - directorySizes[a]);

  let sol2 = undefined;

  // Current available space
  const remainingSpace = availableDisk - rootSize;
  // Space that we need to delete for running the update
  const spaceUntilUpdate = spaceForUpdate - remainingSpace;
  for (const key of keys) {
    const size = directorySizes[key];
    if (size > spaceUntilUpdate) {
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
    directorySizes[getAbsolutePath(node) ?? '/'] = size;
    return size;
  }
}

function getAbsolutePath<T>(node: Node<T>): string {
  if (!node.parent) {
    return '/';
  } else {
    const parentPath = getAbsolutePath(node.parent);
    return `${parentPath === '/' ? '' : parentPath}/${node.name}`
  }
}

function buildFileSystem(input: string): FileSystem {
  const graph: FileSystem = {
    root: {
      name: '/',
      data: {
        type: 'directory',
      },
      children: {},
    },
  };
  const lines = input.split('\n');
  let pointer: Node<Resource> = graph.root;
  for (const line of lines) {
    // Instruction
    if (line.startsWith('$ cd')) {
      const [_, inst, arg] = line.split(' ');
      // Root
      if (arg === '/') {
        pointer = graph.root;
      // Go back
      } else if (arg === '..') {
        if (!pointer.parent) {
          throw new Error(`Cannot go back from ${pointer.name}`)
        }
        pointer = pointer.parent;
      // Go to child
      } else {  
        if (pointer.children[arg] === undefined) {
          throw new Error(`Cannot go into directory ${arg} from ${pointer.name}`);
        }
        pointer = pointer.children[arg];
      }
    }
    else if (line.startsWith('$ ls')) {
      continue;
    }
    else {
      const [pref, name] = line.split(' ');
      if (pref === 'dir') {
        pointer.children[name] = {
          name: name,
          parent: pointer,
          children: {},
          data: {
            type: 'directory',
          }
        }
      }
      else {
        pointer.children[name] = {
          name: name,
          parent: pointer,
          children: {},
          data: {
            type: 'file',
            size: parseInt(pref)
          }
        }
      }
    }
  }
  return graph;
}







