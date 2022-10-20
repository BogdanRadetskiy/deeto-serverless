import { Handler } from 'aws-lambda';
import catchAllFallback from './catchAllFallback';
export const catchAllFallbackHandler: Handler = async (event, _context, _callback) => {
  return catchAllFallback(event);
};
