import React from 'react';
import Tag from '../../../../usx-react/src/components/tag/Tag.tsx';
import { STATUS_TAGS } from './labels.js';

export default function StatusTag({ status, count }) {
  const { label, tone } = STATUS_TAGS[status] ?? { label: status, tone: 'info' };
  return (
    <Tag color={`${tone}-light`} className="text-black" big={true} title={label}>
      {label}{count ? <>{" "}<Tag className="padding-y-0 padding-x-05">{count}</Tag></>: null}
    </Tag>
  );
}
