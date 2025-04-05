import { type SchemaTypeDefinition } from 'sanity'

import {startup} from './startup'
import {authorType} from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [startup, authorType],
}
