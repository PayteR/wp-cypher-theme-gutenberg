/**
 * External dependencies
 */
import memoize from 'memize';
import { times } from 'lodash';

/**
 * Returns the layouts configuration for a given number of timeline.
 *
 * @param {number} timeline Number of timeline.
 *
 * @return {Object[]} Timeline layout configuration.
 */
export const getTimelineTemplate = memoize( ( timeline ) => {
	return times( timeline, () => [ 'cypher/timeline-item' ] );
} );
