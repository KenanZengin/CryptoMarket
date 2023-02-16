import classNames from "classnames";

const TableDiv = props => {

  const {className, sizesm, sizelg, children, ...rest} = props;
  const tableClass = classNames("sitetablediv", className, {
    "table-divsm": Boolean(sizesm),
    "table-divlg": Boolean(sizelg),
  });

  return (
      <div className={tableClass} {...rest}>
        {children}
      </div>
  );

};

TableDiv.Thead = Thead;
TableDiv.Tbody = Tbody;
TableDiv.Tr = Tr;
TableDiv.Th = Th;
TableDiv.Td = Td;
export default TableDiv;

export function Thead(props) {

  const {className, children, ...rest} = props;
  const tableClass = classNames("tbl-thead", className);

  return (
      <div className={tableClass} {...rest}>
        {children}
      </div>
  );

}

export function Tbody(props) {

  const {className, striped, hovered, children, ...rest} = props;
  const tableClass = classNames("tbl-tbody", className, {
    "tbl-striped": Boolean(striped),
    "tbl-hovered": Boolean(hovered),
  });

  return (
      <div className={tableClass} {...rest}>
        {children}
      </div>
  );

}

export function Tr(props) {

  const {className, children, ...rest} = props;
  const tableTrClass = classNames("tbl-tr", className);

  return (
      <div className={tableTrClass} {...rest}>
        {children}
      </div>
  );
}

export function Th(props) {

  const {className, sizefixed, sizeauto, children, ...rest} = props;
  const tableThClass = classNames("tbl-th", className, {
    fxd: Boolean(sizefixed),
    aut: Boolean(sizeauto),
  });

  return (
      <div className={tableThClass} {...rest}>
        {children}
      </div>
  );

}

export function Td(props) {

  const {className, sizefixed, sizeauto, children, ...rest} = props;
  const tableTdClass = classNames("tbl-td", className, {
    fxd: Boolean(sizefixed),
    aut: Boolean(sizeauto),
  });

  return (
      <div className={tableTdClass} {...rest}>
        {children}
      </div>
  );

}