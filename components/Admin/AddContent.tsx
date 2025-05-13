/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DataType, Event, Komsel, PostEvent } from "@/lib/api/event";
import { handleMenu } from "@/lib/slice/menuSlice";
import { HomeTwoTone, PlusCircleOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, FloatButton, Select, Switch } from "antd";
import { createStyles } from "antd-style";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
interface inputInterface {
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

import Papa from 'papaparse';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
        letter-spacing: 0.2rem;
        font-size: 19px;
        font-weight: 500;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const InputCustom = ({ label, onChange }: inputInterface) => {
  return (
    <div className="question">
      <input type="text" required onChange={onChange} />
      <label>{label}</label>
    </div>
  );
};

const AddContent = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [more, isMore] = useState<string[]>([]);
  const initateValue : Event = {
    eventName:'ibadahPagi',
    event:{
      wl:'',
      kolekte:[],
    multimedia:[],
      music:[],
      pembacaWarta:'',
      pendoaSyafaat:[],
      singer:[],
      tamborin:[],
      usher:[],
      perjamuan:[],
    },
    komsel:[],
    dateEvent:''
  }
  const [eventData, setEventData] = useState<Event >(initateValue);
  const [eventKomsel, setEventKomsel] = useState<Komsel[]>([]);
  const [repeatCount, setRepeatCount] = useState(1);

const addMore = () => {
  setRepeatCount((prev) => prev + 1);
};
const minMore = () => {
  if (repeatCount > 1) {
    setRepeatCount((prev) => prev - 1);
    setEventKomsel((prev) => prev.slice(0, -1)); // Hapus objek terakhir
  }
};
  const { styles } = useStyle();
  const handleEventChange = (type: DataType , index: number, value: string) => {
    setEventData((prev) => {
      const updatedArray = [...(prev?.event[type] || [])]; // Ambil array lama (singer/music)
      updatedArray[index] = value; // Update nilai di index tertentu
  
      return {
        ...prev,
        event: {
          ...prev?.event,
          [type]: updatedArray, // Update state sesuai tipe (singer/music)
        },
      };
    });
  };
  const handlePerjamuanChange = (index: number, value: string) => {
    setEventData((prev) => {
      const updatedEvent = { ...prev?.event };
  
      if (value.trim()) {
        const updatedArray = updatedEvent.perjamuan ? [...(updatedEvent.perjamuan as string[])] : [];
        updatedArray[index] = value;
        updatedEvent.perjamuan = updatedArray;
      } else {
        delete updatedEvent.perjamuan;
      }
  
      return { ...prev, event: updatedEvent };
    });
  };
  const inputData = useMemo(
    (): inputInterface[] => [
     
      {
        label: "Worshipleader",
        onChange: (e) => {
            setEventData({...eventData,event:{...eventData.event,wl:e.target.value}})
        }
      },
      {
        label: "Singer I",
        onChange: (e) => {
           handleEventChange('singer', 0, e.target.value)
        }
      },
      {
        label: "Singer II",
        onChange: (e) => {
          handleEventChange('singer', 1, e.target.value)
       }
      },
      {
        label: "Keyboard",
        onChange: (e) => {
          handleEventChange('music', 0, e.target.value)
       }
      },
      {
        label: "Drum",
        onChange: (e) => {
          handleEventChange('music', 1, e.target.value)
       }
      },
      {
        label: "Bass",
        onChange: (e) => {
          handleEventChange('music', 2, e.target.value)
       }
      },
      {
        label: "Kolektan I",
        onChange: (e) => {
          handleEventChange('kolekte', 0, e.target.value)
       }
      },
      {
        label: "Kolektan II",
        onChange: (e) => {
          handleEventChange('kolekte', 1, e.target.value)
       }
      },
      {
        label: "Penerima Tamu I",
        onChange: (e) => {
          handleEventChange('usher', 0, e.target.value)
       }
      },
      {
        label: "Penerima Tamu II",
        onChange: (e) => {
          handleEventChange('usher', 1, e.target.value)
       }
      },
      {
        label: "Pendoa Syafaat I",
        onChange: (e) => {
          handleEventChange('pendoaSyafaat', 0, e.target.value)
       }
      },
      {
        label: "Pendoa Syafaat II",
        onChange: (e) => {
          handleEventChange('pendoaSyafaat', 1, e.target.value)
       }
      },
      {
        label: "Multimedia I",
        onChange: (e) => {
          handleEventChange('multimedia', 0, e.target.value)
       }
      },
      {
        label: "Multimedia II",
        onChange: (e) => {
          handleEventChange('multimedia', 1, e.target.value)
       }
      },
      {
        label: "Tamborin I",
        onChange: (e) => {
          handleEventChange('tamborin', 0, e.target.value)
       }
      },
      {
        label: "Tamborin II",
        onChange: (e) => {
          handleEventChange('tamborin', 1, e.target.value)
       }
      },
      {
        label: "Pembaca Warta",
        onChange: (e) => {

            setEventData({...eventData,event:{...eventData.event,pembacaWarta:e.target.value}})
        }
      },
      {
        label: "Tanggal",
        onChange: (e) => {

            setEventData({...eventData,dateEvent:e.target.value})
        }
      },
    ],
    [eventData]
  );

  const inputPerjamuan = useMemo(
    (): inputInterface[] => [
      {
        label: "Petugas I",
        onChange: (e) => {
          handlePerjamuanChange(0, e.target.value)
       }
      },
      {
        label: "Petugas II",
        onChange: (e) => {
          handlePerjamuanChange(1, e.target.value)
       }
      },
      {
        label: "Petugas III",
        onChange: (e) => {
          handlePerjamuanChange(2, e.target.value)
       }
      },
      {
        label: "Petugas IV",
        onChange: (e) => {
          handlePerjamuanChange(3, e.target.value)
       }
      },
    ],
    [eventData]
  );

  const inputKomsel = useMemo(
    (): inputInterface[] => [
      {
        label: "Komsel",
       
      },
      {
        label: "Keluarga",
       
      },
      {
        label: "Alamat",
        
      },
      {
        label: "Worshipleader",
       
      },
      {
        label: "Musik",
       
      },
      {
        label: "Tanggal",
        
      },
    ],
    []
  );
  useEffect(() => {
    if(more.includes('komsel')) {
      setEventKomsel((prev) => {
        if (prev.length < repeatCount) {
          return [
            ...prev,
            ...Array.from({ length: repeatCount - prev.length }, () => ({
              name: "", alamat: "", wl: "", musik: "", dateKomsel: ""
            }))
          ];
        }
        return prev;
      });

    } else {
      setEventKomsel([])
      
    }
  }, [repeatCount,more]);
  const dispatch = useDispatch();


  const SaveEvent = async () => {
    try {
      console.log(eventKomsel)
        if(eventKomsel.length > 0) {
          setEventData({...eventData,komsel:eventKomsel})
        }
        const response = await PostEvent(eventData)
        
        console.log(response ,'ini')
        if(response.status === 200) {
          dispatch(handleMenu(1))
        }
    } catch (error) {
      console.log(error)
      
    } finally {
      setEventData(initateValue)
    }
  }
  useEffect(() => {
    if(eventKomsel.length > 0) {
      setEventData({...eventData,komsel:eventKomsel})
    } else {
      setEventData((prev) => {
        const updateEvent = {...prev}
        delete updateEvent.komsel
        return updateEvent;
      })
    }
  },[eventKomsel])
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }
    // Parse CSV to JSON using PapaParse
    Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results: Papa.ParseResult<any>) => {
      const jsonDatas = results.data.map((row: any) => ({
        eventName: row.eventName,
        dateEvent: row.dateEvent,
        event: {
          wl: row.wl,
          singer: row.singer ? row.singer.split(';').map((s: string) => s.trim()) : [],
          music: row.music ? row.music.split(';').map((s: string) => s.trim()) : [],
          usher: row.usher ? row.usher.split(';').map((s: string) => s.trim()) : [],
          kolekte: row.kolekte ? row.kolekte.split(';').map((s: string) => s.trim()) : [],
          pendoaSyafaat: row.pendoaSyafaat ? row.pendoaSyafaat.split(';').map((s: string) => s.trim()) : [],
          multimedia: row.multimedia ? row.multimedia.split(';').map((s: string) => s.trim()) : [],
          tamborin: row.tamborin ? row.tamborin.split(';').map((s: string) => s.trim()) : [],
          pembacaWarta: row.pembacaWarta,
          perjamuan: row.perjamuan ? row.perjamuan.split(';').map((s: string) => s.trim()) : []
        }
      }));

      console.log(jsonDatas,'ini json datas'); 
      setJsonData(jsonDatas)// kirim ke backend
    }
  });
  };
  console.log(jsonData);
  
  return (
    <div className="w-full      ">
      <div className="mx-auto text-center text-xl font-mono mb-3 text-white font-semibold">
        <p> Warta Jemaat </p>
      </div>

      <div className="cardInput  !mx-auto">
        <Select
          defaultValue="Ibadah I"
          style={{
            width: "100%",
            background: "transparent",
            minHeight: "50px",
          }}
          onChange={(e) => {

  setEventData({...eventData,eventName:e})
          }}
          options={[
            { value: "ibadahPagi", label: "Ibadah I" },
            { value: "ibadahSiang", label: "Ibadah II" },
            { value: "ibadahSore", label: "Ibadah III" },
            { value: "pemuda", label: "Pemuda" },
          ]}
        />
        {inputData
          .filter((e) => {
            if (eventData?.eventName === "pemuda") {
              if (eventData?.eventName === "pemuda") {
                return ![
                  "Pendoa Syafaat I",
                  "Pendoa Syafaat II",
                  "Penerima Tamu I",
                  "Penerima Tamu II",
                  "Pembaca Warta",
                  "Tamborin I",
                  "Tamborin II",
                  "Multimedia II",
                  "Kolektan II",
                ].includes(e.label);
              }
              return true;
            } else {
              return e;
            }
          })
          .map((e, i) => (
            <InputCustom key={i} label={e.label} onChange={e.onChange} />
          ))}
      </div>

      <div className="cardInput mt-5 !flex  flex-col">
        {more.includes("perjamuan") && (
          <div className="borderCustom py-3 px-2 ">
            <div className="ps-4 flex justify-between items-center  text-xl tracking-widest font-mono mb-3 text-white font-semibold">
              <p>Perjamuan </p>
              <Switch
                onChange={() => {
                  isMore(more.filter((item) => item !== "perjamuan"));
                }}
                checked={more.includes("perjamuan")}
                style={{ margin: 16 }}
              />
            </div>
            {inputPerjamuan.map((e, i) => (
              <InputCustom key={i} label={e.label} onChange={e.onChange} />
            ))}
          </div>
        )}
        {more.includes("komsel") && (
          <div className="borderCustom py-3 mt-5 -mb-5 px-2">
            <div className="ps-4 flex justify-between items-center  text-xl tracking-widest font-mono mb-3 text-white font-semibold">
              <p>Komsel</p>
              <Switch
                onChange={() => {
                  isMore(more.filter((item) => item !== "komsel"));
                }}
                checked={more.includes("komsel")}
                style={{ margin: 16 }}
              />
            </div>
            
            {Array.from({ length: repeatCount }).map((_, index) => (
      <div key={index} className="my-2">
        <p className="text-xl text-white text-center">Komsel {index + 1}</p>
        {inputKomsel.map((e, i) => (
          <InputCustom key={`${index}-${i}`} label={e.label}  onChange={(ev) => {
            setEventKomsel((prev) => (
              prev.map((a, idx) => 
                idx === index ? { ...a, [e.label.toLowerCase() === 'komsel' ? 'name' : e.label.toLowerCase() === 'worshipleader' ? 'wl' :e.label.toLowerCase() === 'tanggal' ? 'dateKomsel' : e.label.toLowerCase() === 'musik' ? 'music' : e.label.toLowerCase() ]: ev.target.value } : a
              ))
            );
          }} />
        ))}
      </div>
    ))}
            <div className="w-full flex justify-center gap-3 -mt-4">

            <Button type="primary" style={{
              width:'200px',
              
            }} size="middle" onClick={() => addMore()}>
            Add More Komsel
          </Button>
          {repeatCount > 1 && (

            <Button type="primary" onClick={() => minMore()} style={{
              width:'200px',
              
            }} size="middle">
            Delete komsel
          </Button>
          )}
            </div>
          </div>
        )}
        <ConfigProvider
          button={{
            className: styles.linearGradientButton,
          }}
        >
          <Button type="primary" size="large" onClick={() => SaveEvent()}>
            Save
          </Button>
        </ConfigProvider>
      </div>
        <form onSubmit={handleFileUpload}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload CSV</button>
      </form>
      {eventData?.eventName !== "pemuda" && more.length < 2 && (
        <FloatButton.Group
          open={open}
          onClick={() => {
            setOpen(!open);
          }}
          trigger="click"
          style={{ insetInlineEnd: 15, bottom: "60px" }}
          icon={<PlusCircleOutlined />}
        >
          {!more.includes("komsel") && (
            <div className="relative">
              <FloatButton
                icon={
                  <div className="">
                    <div className="absolute -left-[6.8rem] rounded-lg text-black font-serif bg-white py-2 px-4 bottom-[2px]  tracking-wider ">
                      <p>Komsel</p>
                    </div>
                    <HomeTwoTone />
                  </div>
                }
                onClick={() => {
                  isMore([...more, "komsel"]);
                }}
              />
            </div>
          )}
          {!more.includes("perjamuan") && (
            <FloatButton
              onClick={() => {
                isMore([...more, "perjamuan"]);
              }}
              icon={
                <div className="">
                  <div className="absolute -left-[8.5rem] rounded-lg text-black font-serif bg-white py-2 px-4 bottom-[3px] tracking-wider ">
                    <p>Perjamuan</p>
                  </div>
                  <HomeTwoTone />
                </div>
              }
            />
          )}
          {/* </div> */}
        </FloatButton.Group>
      )}
    </div>
  );
};

export default AddContent;
