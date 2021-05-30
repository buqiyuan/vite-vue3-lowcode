export enum VisualEditorPropsType {
  input = 'input',
  inputNumber = 'InputNumber',
  color = 'color',
  select = 'select',
  table = 'table',
  switch = 'switch'
}

export type VisualEditorProps = {
  type: VisualEditorPropsType
  label: string
  tips?: string
  multiple?: boolean
  defaultValue?: any
} & {
  options?: VisualEditorSelectOptions
} & {
  table?: VisualEditorTableOption
}

/*---------------------------------------switch-------------------------------------------*/
interface EditorSwitchProp {
  label: string
  defaultValue?: boolean
  tips?: string
}

export function createEditorSwitchProp({
  label,
  defaultValue,
  tips
}: EditorSwitchProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.switch,
    label,
    tips,
    defaultValue
  }
}

/*---------------------------------------input-------------------------------------------*/

interface EditorInputProp {
  label: string
  defaultValue?: any
  tips?: string
}

export function createEditorInputProp({
  label,
  defaultValue,
  tips
}: EditorInputProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.input,
    label,
    tips,
    defaultValue
  }
}
/*---------------------------------------InputNumber -------------------------------------------*/

interface EditorInputNumberProp {
  label: string
  defaultValue?: any
  tips?: string
}

export function createEditorInputNumberProp({
  label,
  defaultValue,
  tips
}: EditorInputNumberProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.inputNumber,
    label,
    tips,
    defaultValue
  }
}

/*---------------------------------------color-------------------------------------------*/

export function createEditorColorProp(label: string, defaultValue?: string): VisualEditorProps {
  return {
    type: VisualEditorPropsType.color,
    label,
    defaultValue
  }
}

/*---------------------------------------select-------------------------------------------*/

export type VisualEditorSelectOptions = {
  label: string
  value: string | number | boolean | object
}[]

interface EditorSelectProp {
  label: string
  options: VisualEditorSelectOptions
  defaultValue?: any
  multiple?: boolean
  tips?: string
}

export function createEditorSelectProp({
  label,
  options,
  defaultValue,
  tips,
  multiple
}: EditorSelectProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.select,
    label,
    defaultValue,
    tips,
    options,
    multiple
  }
}

/*---------------------------------------table-------------------------------------------*/

export type VisualEditorTableOption = {
  options: {
    label: string // 列显示文本
    field: string // 列绑定的字段
  }[]
  showKey: string
}

interface EditorTableProp {
  label: string
  option: VisualEditorTableOption
  defaultValue?: { label: string; value: string }[]
}

export function createEditorTableProp({
  label,
  option,
  defaultValue
}: EditorTableProp): VisualEditorProps {
  return {
    type: VisualEditorPropsType.table,
    label,
    table: option,
    defaultValue
  }
}
