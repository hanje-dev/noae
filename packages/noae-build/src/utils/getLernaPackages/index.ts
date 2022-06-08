import { getPackagesSync } from '@lerna/project';
import { QueryGraph } from '@lerna/query-graph';
import { PackageGraphNode } from '@lerna/package-graph';
// @ts-ignore
import { filterPackages } from '@lerna/filter-packages';

export interface Options {
  /** 指定包含的包 */
  include?: string[];
  /** 指定排除的包 */
  exclude?: string[];
  /**
   * 跳过私有的包
   * @default false
   * */
  skipPrivate?: boolean;
}

/**
 * 获取lerna项目包集合
 * @param cwd
 */
export async function getLernaPackages(cwd: string, opts: Options = {}): Promise<any[]> {
  const { include = [], exclude = [], skipPrivate = false } = opts;
  const allPkgs = getPackagesSync(cwd) ?? [];
  const pkgs = filterPackages(allPkgs, include, exclude, !skipPrivate, true);
  return await getStreamPackages(pkgs);
}

export function getStreamPackages(pkgs: any[]): Promise<any[]> {
  const graph = new QueryGraph(pkgs, {
    graphType: 'allDependencies',
    rejectCycles: true,
  });
  return new Promise((resolve) => {
    const returnValues: any[] = [];
    const queueNextAvailablePackages = () => {
      graph.getAvailablePackages().forEach((pkg) => {
        graph.markAsTaken(pkg.name);
        Promise.resolve(pkg)
          .then((value) => returnValues.push(value))
          .then(() => graph.markAsDone(new PackageGraphNode(pkg)))
          .then(() => queueNextAvailablePackages());
      });
    };
    queueNextAvailablePackages();
    setTimeout(() => {
      resolve(returnValues);
    }, 0);
  });
}
