<script setup lang="ts">
import UILoader from './UILoader.vue'

export interface UITableColumn {
  name: string
  label: string
}

export interface UITableRow {
  [key: string]: any,
}

interface Props {
  columns: UITableColumn[]
  rows: UITableRow[]
  emptyMessage?: string
  loading?: boolean
}

interface Emits {
  (e: "row-click", value: UITableRow): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div :class="$s.tableWrapper">
    <table :class="$s.table">
      <thead :class="$s.thead">
        <tr :class="$s.column">
          <th v-for="(column, index) in columns" :key="index" :class="$s.columnValue">{{ column.label }}</th>
        </tr>
      </thead>

      <tbody :class="$s.tbody">

          <template v-if="!loading">

            <template v-if="rows.length">
              <tr v-for="(row, index) in rows" :key="index" :class="$s.row" @click="$emit('row-click', row)">
                <td v-for="(column, _index) in columns" :key="_index" :class="$s.rowValue">

                  <template v-if="!$slots[column.name]">
                    {{ row[column.name] }}
                  </template>
                  <template v-else>
                    <slot :name="column.name" :row="row[column.name]"></slot>
                  </template>

                </td>
              </tr>
            </template>

            <template v-else>
              <tr>
                <td :colspan="columns.length" :class="$s.loading">
                  {{ emptyMessage ?? "В таблице нет полей" }}
                </td>
              </tr>
            </template>

          </template>
          <template v-else>
            <tr>
              <td :colspan="columns.length" :class="$s.loading">
                <UILoader size="sm" />
              </td>
            </tr>
          </template>

      </tbody>
    </table>
  </div>
</template>

<style lang="scss" module="$s">
.table,
.thead,
.tbody {
  border-spacing: 0;
}

.columnValue,
.rowValue,
.loading {
  padding: functions.rem(12px) functions.rem(16px);
}

.tableWrapper {
  box-shadow: 0 0 functions.rem(8px) 0 rgba(var(--border-color--rgb), 0.2);

  border: functions.rem(1px) solid rgba(var(--border-color--rgb), 0.5);
  border-radius: functions.rem(8px);

  overflow-x: auto;
}

.table {
  width: 100%;


  background-color: var(--background-component-color--hex);
}

.columnValue {
  font-weight: 400;
  border-bottom: functions.rem(1px) solid rgba(var(--border-color--rgb), 0.5);
}

.row {
  text-align: center;
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(var(--border-color--rgb), 0.25);
  }
}

.row:not(.row:last-child) .rowValue {
  border-bottom: functions.rem(1px) solid var(--border-color--hex);
}

.rowValue {
  font-size: var(--font-size-medium-text);
}

.loading {
  text-align: center;
}
</style>
