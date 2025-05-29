import { describe, expect, it } from '@jest/globals';
import { convertBoardIdStringToIdentifiers, OrgBoardIdPrefix, UserBoardIdPrefix } from '../board-id';

describe('convertBoardIdStringToIdentifiers', () => {
  it('should correctly parse a user board ID', () => {
    const userBoardId = `${UserBoardIdPrefix}123456`;
    const result = convertBoardIdStringToIdentifiers(userBoardId);

    expect(result).toEqual({
      boardOwnerType: 'user',
      boardUuid: '123456',
      boardId: userBoardId,
    });
  });

  it('should correctly parse an org board ID', () => {
    const orgBoardId = `${OrgBoardIdPrefix}789012`;
    const result = convertBoardIdStringToIdentifiers(orgBoardId);

    expect(result).toEqual({
      boardOwnerType: 'org',
      boardUuid: '789012',
      boardId: orgBoardId,
    });
  });

  it('should throw an error for invalid board ID format', () => {
    const invalidBoardId = 'invalid_id';
    
    expect(() => {
      convertBoardIdStringToIdentifiers(invalidBoardId);
    }).toThrow(`Invalid board ID - ${invalidBoardId}`);
  });

  it('should throw an error for empty board ID', () => {
    expect(() => {
      convertBoardIdStringToIdentifiers('');
    }).toThrow('Invalid board ID - ');
  });

  it('should handle board IDs with special characters in UUID', () => {
    const userBoardId = `${UserBoardIdPrefix}abc-123-def`;
    const result = convertBoardIdStringToIdentifiers(userBoardId);

    expect(result).toEqual({
      boardOwnerType: 'user',
      boardUuid: 'abc-123-def',
      boardId: userBoardId,
    });
  });
}); 