import { Dependencies } from '../../dependencies';
import { computeAssetCdnUrl } from '../../utils';
import { getDateEventQuery } from '../queries';

export const createGetDateEvents =
  (dependencies: Dependencies) => async (id: number) => {
    const { postgres } = dependencies;

    const result = await postgres.exec(getDateEventQuery(id));

    return result.map((row) => ({
      ...row,
      image: computeAssetCdnUrl(
        process.env['CDN_URL'] || 'http://localhost:8080',
        row.last_commit,
        row.path,
        row.image,
      ),
    }));
  };
